import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        String input = args[0];
        List<Integer> numbers = Arrays.stream(input.split(","))
                .filter(n -> !n.trim().isEmpty() && Integer.parseInt(n.trim()) != Integer.MIN_VALUE)
                .mapToInt(Integer::parseInt)
                .collect(Collectors.toList());

        Set<Integer> unique = numbers.stream().distinct().collect(Collectors.toSet());
        int count = unique.size();
        long sum = unique.stream().mapToInt(Integer::intValue).sum();

        System.out.println("count=" + count + " sum=" + sum);
    }
}
